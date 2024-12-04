import { PersistStorage, StorageValue } from 'zustand/middleware';

interface PersistedState {
  participants: string[];
}

const JSONBIN_URL = 'https://api.jsonbin.io/v3/b';

class CustomStorage implements PersistStorage<PersistedState> {
  private binId: string | null = null;
  private apiKey: string = import.meta.env.VITE_JSONBIN_API_KEY;

  private async createBin(value: StorageValue<PersistedState>): Promise<string> {
    const response = await fetch(JSONBIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': this.apiKey,
      },
      body: JSON.stringify(value),
    });
    
    if (!response.ok) {
      const error = await response.json();
      console.error('Error creating bin:', error);
      throw new Error(error.message);
    }
    
    const data = await response.json();
    return data.metadata.id;
  }

  private async updateBin(value: StorageValue<PersistedState>): Promise<void> {
    if (!this.binId) {
      this.binId = await this.createBin(value);
      localStorage.setItem('jsonbin-id', this.binId);
      return;
    }

    const response = await fetch(`${JSONBIN_URL}/${this.binId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': this.apiKey,
      },
      body: JSON.stringify(value),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Error updating bin:', error);
      throw new Error(error.message);
    }
  }

  private async getBinData(): Promise<StorageValue<PersistedState> | null> {
    if (!this.binId) return null;

    try {
      const response = await fetch(`${JSONBIN_URL}/${this.binId}/latest`, {
        headers: {
          'X-Master-Key': this.apiKey,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Error fetching bin:', error);
        return null;
      }

      const data = await response.json();
      return data.record;
    } catch (error) {
      console.error('Error fetching from JSONBin:', error);
      return null;
    }
  }

  async getItem(key: string): Promise<StorageValue<PersistedState> | null> {
    if (this.apiKey === 'local') {
      const item = localStorage.getItem(key);
      if (!item) return null;
      
      try {
        const parsed = JSON.parse(item);
        // Ensure we return the correct structure
        if (!parsed.state) {
          return {
            state: parsed,
            version: 0
          };
        }
        return parsed;
      } catch (e) {
        console.error('Error parsing stored data:', e);
        return null;
      }
    }

    // Try to get existing binId
    this.binId = localStorage.getItem('jsonbin-id');
    return this.getBinData();
  }

  async setItem(key: string, value: StorageValue<PersistedState>): Promise<void> {
    if (this.apiKey === 'local') {
      localStorage.setItem(key, JSON.stringify(value));
      return;
    }

    return this.updateBin(value);
  }

  async removeItem(key: string): Promise<void> {
    if (this.apiKey === 'local') {
      localStorage.removeItem(key);
      return;
    }

    // For JSONBin, we'll just update with empty state
    return this.updateBin({ state: { participants: [] }, version: 0 });
  }
}

export const customStorage = new CustomStorage();