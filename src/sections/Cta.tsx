import { RollingText } from "../components/RollingText";
import { Svg } from "../components/Svg";
import { TextFx } from "../components/TextFx";
import { Press } from "../components/Press";
import { tween } from "../components/Reveal";
import "./Cta.css";

export function Cta() {
  return (
    <div className="cta-cta-section">
      <div className="cta-hero-69">
        <div className="cta-box" data-fx="cta" />
        <div className="cta-box-2">
          <div className="cta-slot">
            <div className="cta-box-3">
              <Svg className="cta-svg" id="svg17" />
            </div>
          </div>
        </div>
        <div className="cta-box-4">
          <div className="cta-box-5">
            <div className="cta-box-6">
              <img className="cta-img" src="/images/colophon/cta-dashboard.webp" alt="" draggable={false} />
            </div>
          </div>
          <div className="cta-box-7">
            <div className="cta-box-8">
              <TextFx className="cta-box-9" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.075 }} target="cta">
                <p className="cta-p"><span className="bp-only-1300-1440-1920-2600-1000">{"Publishing you can"}</span><span className="bp-only-390">{"Publishing you can check every "}</span></p>
                <p className="cta-p-2"><span className="bp-only-1300-1440-1920-2600-1000">{"check every "}</span><span className="bp-only-390">{"release."}</span></p>
                <p className="cta-p-3">{"release."}</p>
              </TextFx>
            </div>
            <div className="cta-box-10">
              <TextFx className="cta-box-11" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.075 }}>
                <p className="cta-p-4">{"Colophon is still being built, in public. Follow the build log or read the source. "}</p>
              </TextFx>
              <div className="cta-box-12">
                <div className="cta-slot-2">
                  <a className="cta-link" data-name="Default">
                    <Press className="cta-slot-3" as="div" data-name="Label">
                      <RollingText className="cta-box-13" text="Get started" color="rgb(255, 255, 255)" fontFamily={"Inter, \"Inter Placeholder\", sans-serif"} fontWeight={400} />
                    </Press>
                    <div className="cta-box-14">
                      <div className="cta-box-15">
                        <div className="cta-box-16">
                          <img className="cta-img-2" src="/images/XxkKDiuJDVV0jKAS4a8ieVIfhak.svg" alt="" draggable={false} />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="cta-request-demo">
                  <p className="cta-p-5">
                    <a className="cta-link-2" href="./">{"See the source"}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cta-box-17" data-border="true" />
      </div>
    </div>
  );
}
