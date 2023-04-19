import type { App } from 'vue';
import Card from './Card/vue';
import Skeleton from './Skeleton/vue';
const version = '0.9.0';
function install(app: App) {
  const packages = [Card,Skeleton];

  packages.forEach((pkg: any) => {
    if (pkg.install) {
      app.use(pkg);
    } else if (pkg.name) {
      app.component(pkg.name, pkg);
    }
  });
}
export { install, Card, Skeleton };
export default { install, version };
