
export interface Activity {
  id: string;
  title: string;
  calories: number;
  image: string;
  date: string;
  type: string;
}

export interface QuickOption {
  label: string;
  icon: string;
  color: string;
  image: string;
}

export const STORAGE_KEY = 'sports_data_v1';