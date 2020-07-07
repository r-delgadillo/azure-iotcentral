import { Authentication } from './clients';
import * as Scripts from './scripts/iotcentral';

async function main() {
    await Authentication.login();
    await Scripts.execute();
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
