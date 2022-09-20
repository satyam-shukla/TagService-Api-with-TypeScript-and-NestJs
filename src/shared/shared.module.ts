import {Module} from '@nestjs/common';
import { AppConfigService } from './services/config.service';

@Module({
    imports: [],
    providers: [AppConfigService],
    exports: [AppConfigService]
})
export class SharedModule{}