import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../package.json');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:'],
        },
      },
      referrerPolicy: {
        policy: ['no-referrer'],
      },
      permittedCrossDomainPolicies: {
        permittedPolicies: 'none',
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('PicoGalaxy API')
    .setDescription('API de la vie quotidienne')
    .setVersion(version)
    .addBearerAuth()
    .addServer(process.env.NODE_ENV === 'production' ? '/api' : '')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(8000);
}
bootstrap();
