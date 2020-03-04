import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot(): { success: boolean; [key: string]: any } {
    return { success: true, data: 'hello world' };
  }
}
