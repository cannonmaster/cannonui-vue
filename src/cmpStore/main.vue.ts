import type { App } from 'vue';
import Card from './Card/vue';
import Skeleton from './Skeleton/vue';
import Col from './Col/vue';
import Row from './Row/vue';
import Drag from './Drag/vue';
import Switch from './Switch/vue';
import SearchBar from './SearchBar/vue';
import InfiniteLoading from './InfiniteLoading/vue';
import Video from './Video/vue';
import Swiper from './Swiper/vue';
import Price from './Price/vue';
const version = '0.9.0';
function install(app: App) {
  const packages = [Card, Switch, Skeleton, Col, Row, Drag, InfiniteLoading, SearchBar, Price, Swiper, Video];

  packages.forEach((pkg: any) => {
    if (pkg.install) {
      app.use(pkg);
    } else if (pkg.name) {
     app.component(pkg.name, pkg);
    }
  });
}
export { install, Card, Skeleton, Col, Row, Switch, Drag };
export default { install, version };
