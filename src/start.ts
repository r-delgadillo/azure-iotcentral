import * as Authentication from './clients/authentication';
import * as Scripts from './scripts/iotcentral';

async function main() {
    await Authentication.signIn(Authentication.SignInTypes.ServicePrincipal);
    await Scripts.execute();
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
