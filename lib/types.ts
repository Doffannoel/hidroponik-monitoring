// ─── Auth ────────────────────────────────────────────────────────────────────
export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface RegisterPayload {
  email: string;
  full_name: string;
  password: string;
  confirm_password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  avatar_url: string | null;
  has_password: boolean;
  is_staff: boolean;
}

// ─── Products / Boxes ────────────────────────────────────────────────────────

export type PlantType =
  | "selada"
  | "bayam"
  | "kangkung"
  | "tomat"
  | "cabai"
  | "strawberry"
  | "basil";

export type FertilizerAmount = "5ml" | "10ml";

export interface DeviceData {
  ph: number | null;
  tds: number | null;
  water_level: number | null;
  updated_at: string;
}

export interface Device {
  id: number;
  device_id: string;
  latest: DeviceData | null;
}

export interface Box {
  id: number;
  name: string;
  device_id: string;
  image_url: string | null;
  start_date: string;
  plant_type: PlantType;
  fertilizer_amount: FertilizerAmount;
  created_at: string;
  devices: Device[];
}

export interface BoxCreatePayload {
  name: string;
  device_id: string;
  start_date: string;
  plant_type: PlantType;
  fertilizer_amount: FertilizerAmount;
}

export interface BoxUpdatePayload {
  name?: string;
  device_id?: string;
  start_date?: string;
  plant_type?: PlantType;
  fertilizer_amount?: FertilizerAmount;
}

// ─── Device History ──────────────────────────────────────────────────────────

export interface DeviceHistoryEntry {
  ph: number | null;
  tds: number | null;
  water_level: number | null;
  created_at: string;
}

// ─── Alerts ──────────────────────────────────────────────────────────────────

export type AlertType = "ph_low" | "ph_high" | "tds_low" | "tds_high";

export interface Alert {
  id: number;
  device_id: string;
  alert_type: AlertType;
  value: number;
  threshold: number;
  is_resolved: boolean;
  created_at: string;
  resolved_at: string | null;
}

// ─── WebSocket Messages ──────────────────────────────────────────────────────

export interface WsConnectedMessage {
  type: "connected";
  device_id: string;
  message: string;
}

export interface WsSensorMessage {
  type: "sensor";
  sensor_type: "ph" | "tds" | "waterlevel";
  value: number;
  device_id: string;
}

export interface WsAlertMessage {
  type: "alert";
  alert_type: AlertType;
  value: number;
  threshold: number;
  plant_type: string;
}

export type WsMessage = WsConnectedMessage | WsSensorMessage | WsAlertMessage;

// ─── API Error ───────────────────────────────────────────────────────────────

export interface ApiError {
  detail?: string;
  error?: string;
  [key: string]: unknown;
}
