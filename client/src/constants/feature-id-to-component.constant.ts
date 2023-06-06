/**
 * TODO fix
 * For some reason import from @features does not work
 */
import { AgentIdentityPanel } from '@features/panels/agent-identity-panel/agent-identity-panel.component';
import { NetworkPanel } from '@features/panels/network-panel/network-panel.component';
import { FactionsPanel } from '@features/panels/factions-panel/factions-panel.component';
import { ServerStatusPanel } from '@features/panels/server-status-panel/server-status-panel.component';
import { FeaturePanelsIds } from '@constants';

export const FEATURE_ID_TO_COMPONENT = {
  [FeaturePanelsIds.AGENT_ID]: AgentIdentityPanel,
  [FeaturePanelsIds.NETWORK]: NetworkPanel,
  [FeaturePanelsIds.FACTIONS]: FactionsPanel,
  [FeaturePanelsIds.SERVER_STATUS]: ServerStatusPanel,
};

console.log({FEATURE_ID_TO_COMPONENT})

export const FEATURE_ID_TO_IS_MAIN_SECTION = {
  [FeaturePanelsIds.AGENT_ID]: true,
  [FeaturePanelsIds.FACTIONS]: true,
  [FeaturePanelsIds.NETWORK]: false,
  [FeaturePanelsIds.SERVER_STATUS]: false,
};