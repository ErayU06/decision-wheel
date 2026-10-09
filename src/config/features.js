// Master switch for the Pro / paywall layer.
// false -> v1.0 ships fully free: every feature is unlocked and no paywall, lock,
//          PRO badge or test switch is rendered.
// true  -> the mock Pro layer (limits, locks, paywall, test switch) is active.
//          Wire up real Play Billing / App Store IAP before turning this on.
export const MONETIZATION_ENABLED = false;
