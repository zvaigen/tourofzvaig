export class Asteroid {
    name: string;
    id: number;
    close_approach_data:closeApproachData[]=[];
    public
  }

  class closeApproachData {
    close_approach_date: String;
    relative_velocity: relativeVelocity;

  }

  class relativeVelocity {
    kilometers_per_hour: number;
  }