import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  cartKey: string;       // `${productId}-${boxAndPapers ? 'bp' : 'std'}`
  id: string;            // product.id
  slug: string;
  brandSlug: string;
  collectionSlug: string;
  brand: string;
  name: string;
  variant: string;
  size?: string;
  range: 'essential' | 'premium';
  price: number;         // final unit price (incl. box & papers if selected)
  boxAndPapers: boolean;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

interface CartActions {
  addItem: (item: Omit<CartItem, 'cartKey' | 'quantity'>) => void;
  removeItem: (cartKey: string) => void;
  updateQuantity: (cartKey: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const cartKey = `${item.id}-${item.boxAndPapers ? 'bp' : 'std'}`;
        set((state) => {
          const existing = state.items.find((i) => i.cartKey === cartKey);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.cartKey === cartKey ? { ...i, quantity: i.quantity + 1 } : i
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { ...item, cartKey, quantity: 1 }],
            isOpen: true,
          };
        });
      },

      removeItem: (cartKey) => {
        set((state) => ({
          items: state.items.filter((i) => i.cartKey !== cartKey),
        }));
      },

      updateQuantity: (cartKey, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartKey);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.cartKey === cartKey ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: 'artemis-cart',
      partialize: (state) => ({ items: state.items }), // don't persist isOpen
    }
  )
);

// ── Selectors ──────────────────────────────────────────────────
export const selectItemCount = (state: CartStore) =>
  state.items.reduce((sum, i) => sum + i.quantity, 0);

export const selectCartTotal = (state: CartStore) =>
  state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
