import Base from "../Components/Base";
const Service = () => {
  return (
    <>
      <Base
        title="services we provide"
        description="we will provide multiple services here..."
        buttonEnabled={true}
        buttonText="Home"
        buttonType="warning"
      >
        <div>
          <h1>This is Service Page....!!!</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
            commodi dicta eligendi, quibusdam a reiciendis ut at praesentium
            blanditiis distinctio labore excepturi omnis molestiae et.
          </p>
        </div>
      </Base>
    </>
  );
};
export default Service;
