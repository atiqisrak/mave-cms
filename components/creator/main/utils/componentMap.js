import TitleComponent from "../components/TitleComponent";
import MediaComponent from "../components/MediaComponent";
import MenuComponent from "../components/MenuComponent";
import SliderComponent from "../components/SliderComponent";
import CardComponent from "../components/CardComponent";
import FormComponent from "../components/FormComponent";
import FooterComponent from "../components/FooterComponent";
import EventComponent from "../components/EventComponent";

// Mapping component types to their respective component
const componentMap = {
  title: TitleComponent,
  media: MediaComponent,
  menu: MenuComponent,
  slider: SliderComponent,
  card: CardComponent,
  form: FormComponent,
  footer: FooterComponent,
  event: EventComponent,
};

export default componentMap;
