import { NestFactory } from '@nestjs/core'
import { ApplicationModule } from './app.module'

import * as cors from 'cors'

const PORT = Number(process.env.PORT)

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule)

    // Setup cors
    const corsOptions = {
        origin: /(.*\.webjs.pl|.*\.test)/,
        credentials: true,
    }

    app.use(cors(corsOptions))

    await app.listen(PORT).then(() => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}
bootstrap()
