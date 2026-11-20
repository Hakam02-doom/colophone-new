import { LogoMarquee } from "../components/LogoMarquee";
import { Reveal, tween, spring } from "../components/Reveal";
import "./TrustedPartners.css";

export function TrustedPartners() {
  return (
    <div className="trusted-box">
      <div className="trusted-box-2" data-fx="trusted">
        <div className="trusted-box-3">
          <Reveal className="trusted-box-4" as="div" from={{ opacity: 0 }} to={{ opacity: 1 }} transition={tween(0.4)} target="trusted">
            <div className="trusted-slot">
              <Reveal className="trusted-box-5" as="div" from={{ width: 1 }} to={{ width: "auto" }} transition={spring(0.4, 0.2)} target="trusted">
                <div className="trusted-box-6">
                  <img className="trusted-img" src="/images/vUXLqHPdI1M9TIARK6LlAOeyGAY.png" alt="" draggable={false} />
                </div>
                <Reveal className="trusted-trusted-partners" as="div" from={{ opacity: 0 }} to={{ opacity: 1 }} transition={spring(0.4, 0.2)} target="trusted">
                  <h2 className="trusted-h2">{"Ways to connect"}</h2>
                </Reveal>
              </Reveal>
            </div>
            <div className="trusted-slot-2">
              <Reveal className="trusted-box-7" as="div" from={{ width: 1 }} to={{ width: "auto" }} transition={spring(0.4, 0.2)} target="trusted">
                <div className="trusted-box-8">
                  <img className="trusted-img-2" src="/images/vUXLqHPdI1M9TIARK6LlAOeyGAY.png" alt="" draggable={false} />
                </div>
                <Reveal className="trusted-trusted-partners-2" as="div" from={{ opacity: 0 }} to={{ opacity: 1 }} transition={spring(0.4, 0.2)} target="trusted">
                  <h2 className="trusted-h2-2">{"Ways to connect"}</h2>
                </Reveal>
              </Reveal>
            </div>
            <div className="trusted-box-9" />
          </Reveal>
        </div>
        <Reveal className="trusted-box-10" as="div" from={{ opacity: 0 }} to={{ opacity: 1 }} transition={tween(0.4)} target="trusted">
          <div className="trusted-slot-3">
            <LogoMarquee logos={["/images/connect-rest.svg", "/images/connect-graphql.svg", "/images/connect-typescript-sdk.svg", "/images/connect-cli.svg", "/images/connect-mcp-server.svg", "/images/connect-rest.svg", "/images/connect-graphql.svg", "/images/connect-typescript-sdk.svg", "/images/connect-cli.svg", "/images/connect-mcp-server.svg"]} />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
