import { useEffect, useState } from 'react';
import { BroadcastChannel, createLeaderElection } from 'broadcast-channel';

const canal = new BroadcastChannel('leader_election');

const leaderElector = createLeaderElection(canal, {
  fallbackInterval: 2000, // optional configuration for how often will renegotiation for leader occur
  responseTime: 1000 // optional configuration for how long will instances have to respond
});

export const useLeaderElection = () => {
  const [isLeader, setIsLeader] = useState(false);

  useEffect(() => {
    /**
     * Espera el liderazgo de las tabs
     */
    function esperarLiderazgo() {
      leaderElector
        .awaitLeadership()
        .then((e) => {
          console.log(e);
          setIsLeader(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    esperarLiderazgo();

    // leaderElector.onduplicate = () => {
    //   leaderElector.die();
    //   esperarLiderazgo();
    // };

    return () => {
      (async () => {
        try {
          // When the leader tab is closed or refreshed, the library automatically holds a new election.
          // But you can manually apply to not be a leader anymore with:
          await leaderElector.die();
        } catch (e) {
        }
      })();
    };
  }, []);

  return isLeader;
};
