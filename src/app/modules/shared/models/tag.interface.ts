import { BaseName } from './base-name.interface';
import { Course } from '../../shared-types';

export interface Tag extends BaseName {
  image: string;

  courses: Partial<Course>[];
}
