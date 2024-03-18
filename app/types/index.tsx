export interface Position {
  coords: {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
  timestamp: number;
}


export interface PositionError{
  error: {
    code: number;
    message: string;
    PERMISSION_DENIED: number;
    POSITION_UNAVAILABLE: number;
    TIMEOUT: number;
  }
}

// const something = 