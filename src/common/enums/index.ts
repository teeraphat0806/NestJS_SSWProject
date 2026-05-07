export enum Role {
  SUPERADMIN = 'superadmin',
  GUEST = 'guest',
  CLERK = 'clerk',
  SUPERVISOR = 'supervisor',
  ACCOUNTANT = 'accountant',
  CUTTER = 'cutter',
  DELIVERY = 'delivery',
}

export enum JobStatus {
  PENDING = 'pending',
  CUTTING = 'cutting',
  WEIGHING = 'weighing',
  READY = 'ready',
  SHIPPED = 'shipped',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export enum ShapeSteel {
  SQUARE = 'square',
  LINE = 'line',
}

export enum CuttingMethod {
  NORMAL = 'normal',
  FB = 'FB',
  CNC = 'CNC',
  RM = 'RM',
}

export enum StockStatus {
  AVAILABLE = 'available',
  WITHDRAWN = 'withdrawn',
}

export enum SteelStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  HOLD = 'hold',
}

export enum OrderStaffRole {
  SUPERVISOR = 'supervisor',
  CUTTER = 'cutter',
}

export enum ContactType {
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
  FAX = 'FAX',
  ADDRESS = 'ADDRESS',
}
