import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
    role: string;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    flash: {
        success?: string;
        error?: string;
    };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface IndikatorTypes {
    id: number;
    nama: string;
    keterangan: string;
    attribut: {
        batas: number;
        operator: string;
        nilai: string;
    }[];
    [key: string]: unknown; // This allows for additional properties...
}

export interface DatasetTypes {
    id: number | null;
    label: string;
    parameter: { indikator_id: number; nilai: string | null }[];
    [key: string]: unknown; // This allows for additional properties...
}
export interface ParameterTransaction {
    indikator_id: number;
    nilai: string | null;
}
// types/index.ts
export interface FoodData {
    MENU: string;
    KALORI: number;
    PROTEIN: number;
    LEMAK: number;
    KARBOHIDRAT: number;
    NATRIUM: number;
    KALIUM: number;
    KALSIUM: number;
    MAGNESIUM: number;
}

export interface ClusterResult {
    cluster: number;
    distance: number;
}

export interface ScaledFoodData extends FoodData {
    scaledValues: number[];
    clusterResult?: ClusterResult;
}
export interface ResultFoodData extends FoodData {
    clusterResult: string | 'Pagi' | 'Siang' | 'Malam';
}

export interface Centroids {
    PAGI: number[];
    SIANG: number[];
    MALAM: number[];
}

export interface ClusterStats {
    [key: string]: {
        count: number;
        averages: Partial<FoodData>;
    };
}
