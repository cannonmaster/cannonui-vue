import type { App } from 'vue';
import Card from './Card/vue';
import Skeleton from './Skeleton/vue';
import Col from './Col/vue';
import Row from './Row/vue';
import Drag from './Drag/vue';
const version = '0.9.0';
function install(app: App) {
  const packages = [Card,Skeleton, Col, Row, Drag];

  packages.forEach((pkg: any) => {
    if (pkg.install) {
      app.use(pkg);
    } else if (pkg.name) {
     app.component(pkg.name, pkg);
    }
  });
}
export { install, Card, Skeleton, Col, Row, Drag };
export default { install, version };
