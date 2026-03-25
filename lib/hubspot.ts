import { getEnv } from '@/lib/env';

const HUBSPOT_API_KEY = getEnv('HUBSPOT_API_KEY');

interface HubSpotContact {
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  city?: string;
  source?: string;
}

async function hubspotFetch(
  input: string,
  init?: RequestInit
): Promise<Response | null> {
  if (!HUBSPOT_API_KEY) return null;

  try {
    return await fetch(input, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${HUBSPOT_API_KEY}`,
        ...(init?.headers ?? {}),
      },
    });
  } catch (error) {
    console.error('HubSpot request error:', error);
    return null;
  }
}

export async function upsertContact(contact: HubSpotContact) {
  if (!HUBSPOT_API_KEY) return null;

  const properties = {
    email: contact.email,
    firstname: contact.firstname || '',
    lastname: contact.lastname || '',
    phone: contact.phone || '',
    city: contact.city || 'Montreal',
    hs_lead_status: 'NEW',
    artemis_source: contact.source || 'website',
  };

  const createResponse = await hubspotFetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    method: 'POST',
    body: JSON.stringify({ properties }),
  });

  if (!createResponse) return null;
  if (createResponse.ok) return createResponse.json();

  if (createResponse.status !== 409) {
    const text = await createResponse.text();
    console.error('HubSpot contact create failed:', text);
    return null;
  }

  const updateResponse = await hubspotFetch(
    `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(contact.email)}?idProperty=email`,
    {
      method: 'PATCH',
      body: JSON.stringify({ properties }),
    }
  );

  if (!updateResponse?.ok) {
    const text = updateResponse ? await updateResponse.text() : 'no response';
    console.error('HubSpot contact update failed:', text);
    return null;
  }

  return updateResponse.json();
}

export async function createDeal(params: {
  contactEmail: string;
  dealName: string;
  amount: number;
  stage: string;
  products: string[];
}) {
  if (!HUBSPOT_API_KEY) return null;

  const response = await hubspotFetch('https://api.hubapi.com/crm/v3/objects/deals', {
    method: 'POST',
    body: JSON.stringify({
      properties: {
        dealname: params.dealName,
        amount: String(params.amount),
        dealstage: params.stage,
        pipeline: 'default',
        artemis_products: params.products.join(', '),
        artemis_contact_email: params.contactEmail,
      },
    }),
  });

  if (!response?.ok) {
    const text = response ? await response.text() : 'no response';
    console.error('HubSpot deal error:', text);
    return null;
  }

  return response.json();
}

export async function updateContactProperty(
  email: string,
  properties: Record<string, string>
) {
  if (!HUBSPOT_API_KEY) return null;

  const response = await hubspotFetch(
    `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email`,
    {
      method: 'PATCH',
      body: JSON.stringify({ properties }),
    }
  );

  if (!response?.ok) {
    const text = response ? await response.text() : 'no response';
    console.error('HubSpot update error:', text);
    return null;
  }

  return response.json();
}
