import { Motion } from './Motion';

export class MotionEmpty extends Motion {
  constructor() {
    super({
      isCharacterUpdated: false,
      isLinewise: false,
    });
  }
}
