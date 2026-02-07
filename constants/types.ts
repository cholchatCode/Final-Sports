// constants/types.ts
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
  defaultCalories: string;
  image: string;
}

// เปลี่ยน Key เพื่อเริ่มเก็บข้อมูลชุดใหม่ (ป้องกันข้อมูลเก่าตีกัน)
export const STORAGE_KEY = 'sports_data_v3';