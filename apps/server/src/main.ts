import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ValidationException,
  ValidationFilter,
} from './validation/validation.filter';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      exceptionFactory: (errors: ValidationError[]) => {
        const errorMessage = errors.reduce(
          (acc, nextErr) => {
            acc[nextErr.property] = [
              ...Object.values(nextErr.constraints ?? {}),
            ];
            return acc;
          },
          {} as Record<string, string[]>,
        );
        return new ValidationException(errorMessage);
      },
    }),
  );

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
