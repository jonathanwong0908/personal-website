import ScrollOpacityText from "../animation/scroll-opacity-text";
import ScrollScaleContainer from "../animation/scroll-scale-container";

const About = () => {
  return (
    <ScrollScaleContainer className="min-h-screen rounded-lg bg-inverted">
      <section id="about-section h-full">
        <div className="grid h-full place-items-center">
          <ScrollOpacityText
            className="text-inverted max-w-xl text-2xl"
            text={
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, commodi alias? Obcaecati, neque totam! Explicabo atque aperiam fugit. Quibusdam, alias."
            }
          />
        </div>
      </section>
    </ScrollScaleContainer>
  );
};

export default About;
