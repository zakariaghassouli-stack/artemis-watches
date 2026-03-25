import { StudioApp } from '@/components/studio/StudioApp';

export const metadata = {
  title: 'Artemis Studio',
};

export const dynamic = 'force-static';

export default function StudioPage() {
  return <StudioApp />;
}
