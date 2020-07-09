import { Authentication } from './clients';
import * as Scripts from './scripts/iotcentral';

async function main() {
    // Authenticate to retrieve access tokens
    await Authentication.login(Authentication.SignInTypes.ServicePrincipal);

    // Execute script
    await Scripts.execute();
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
