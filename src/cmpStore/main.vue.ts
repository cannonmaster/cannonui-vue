import type { App } from 'vue';
import Card from './Card/vue';

const version = '0.9.0';
function install(app: App) {
  const packages = [Card];

  packages.forEach((pkg: any) => {
    if (pkg.install) {
      app.use(pkg);
    } else if (pkg.name) {
      app.component(pkg.name, pkg);
    }
  });
}
export { install, Card };
export default { install, version };
