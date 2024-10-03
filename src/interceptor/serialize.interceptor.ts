import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { UserDTO } from 'src/users/dtos/user.dto';
export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // console.log('I am running before the handler', context);

    return next.handle().pipe(
      // run after the handler
      map((data: any) => {
        return plainToClass(UserDTO, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
