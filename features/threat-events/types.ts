export interface BaseThreatEvent {
  id: string;
  eventName: string;
  timestamp: number;
  applicationState: string;
}

export interface NetworkProxyConfiguredEvent extends BaseThreatEvent {
  eventName: "NetworkProxyConfigured";
  proxyHost: string;
  proxyPort: number;
  proxyType: string;
  connectionType: string;
}
