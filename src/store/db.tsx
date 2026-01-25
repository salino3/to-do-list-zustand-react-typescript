const DB_NAME = import.meta.env.VITE_APP_DB_NAME;
const STORE_NAME = import.meta.env.VITE_APP_STORE_NAME;

export const dbIDBStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);

      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains(STORE_NAME)) {
          request.result.createObjectStore(STORE_NAME);
        }
      };

      request.onsuccess = () => {
        const db = request.result;
        // Check if store exists to avoid error
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          resolve(null);
          return;
        }
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const getRequest = store.get(name);
        getRequest.onsuccess = () => resolve(getRequest.result || null);
        getRequest.onerror = () => reject(getRequest.error);
      };
      request.onerror = () => reject(request.error);
    });
  },

  setItem: async (name: string, value: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);

      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains(STORE_NAME)) {
          request.result.createObjectStore(STORE_NAME);
        }
      };

      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).put(value, name);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      };
      request.onerror = () => reject(request.error);
    });
  },

  removeItem: async (name: string): Promise<void> => {
    return new Promise((resolve) => {
      const request = indexedDB.open(DB_NAME, 1);
      request.onsuccess = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) return resolve();
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).delete(name);
        tx.oncomplete = () => resolve();
      };
    });
  },
};
