import { Svg } from "../components/Svg";
import { TextFx } from "../components/TextFx";
import { Reveal, tween, spring } from "../components/Reveal";
import "./Security.css";

export function Security() {
  return (
    <div className="security-security-section">
      <div className="security-box" data-fx="security">
        <div className="security-box-2">
          <div className="security-box-3">
            <Reveal className="security-tag-security" as="div" from={{ opacity: 0 }} to={{ opacity: 1 }} transition={tween(0.4)} target="security">
              <div className="security-slot">
                <Reveal className="security-box-4" as="div" from={{ width: 1 }} to={{ width: "auto" }} transition={spring(0.4, 0.2)} target="security">
                  <div className="security-box-5">
                    <img className="security-img" src="/images/lKDUJqhpfhIjo8LuGDcPtVsXJ8.png" alt="" draggable={false} />
                  </div>
                  <Reveal className="security-security" as="div" from={{ opacity: 0 }} to={{ opacity: 1 }} transition={spring(0.4, 0.2)} target="security">
                    <h2 className="security-h2">{"Safety"}</h2>
                  </Reveal>
                </Reveal>
              </div>
              <div className="security-box-6" />
            </Reveal>
            <div className="security-box-7">
              <div className="security-box-8">
                <img className="security-img-2" src="/images/colophon/safety-team.webp" alt="" draggable={false} />
              </div>
            </div>
          </div>
        </div>
        <div className="security-box-9">
          <div className="security-box-10" data-fx="security-card">
            <div className="security-box-11" data-border="true">
              <div className="security-box-12">
                <img className="security-img-3" src="/images/B3k5nB2elFWd3yREp9Jm1G5rKc.png" alt="compilance bg" draggable={false} />
              </div>
              <div className="security-white-block" data-border="true" />
              <div className="security-white-block-2" data-border="true" />
              <div className="security-box-13">
                <div className="security-box-14">
                  <div className="security-box-15">
                    <div className="security-box-16" />
                    <TextFx className="security-complaince" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.075 }} target="security-card">
                      <p className="security-p"><span className="security-run">{"Guarantees"}</span></p>
                    </TextFx>
                  </div>
                </div>
                <TextFx className="security-security-built-into-every-an" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.075 }} target="security-card">
                  <p className="security-p-2">{"Built so you "}<span className="security-run-2">{"lose nothing"}</span></p>
                </TextFx>
              </div>
              <div className="security-box-17">
                <div className="security-box-18">
                  <img className="security-img-4" src="/images/colophon/safety-card.webp" alt="" draggable={false} />
                </div>
              </div>
              <div className="security-box-19">
                <div className="security-box-20">
                  <img className="security-img-5" src="/images/colophon/safety-card.webp" alt="" draggable={false} />
                </div>
              </div>
              <div className="security-box-21">
                <div className="security-box-22">
                  <div className="security-box-23">
                    <div className="security-box-24">
                      <Svg className="security-svg" id="svg12" />
                    </div>
                  </div>
                  <TextFx className="security-iso-27001" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.075 }} target="security-card">
                    <p className="security-p-3">{"Crash-safe saves"}</p>
                  </TextFx>
                </div>
                <div className="security-box-25">
                  <div className="security-box-26">
                    <div className="security-box-27">
                      <Svg className="security-svg-2" id="svg12" />
                    </div>
                  </div>
                  <TextFx className="security-hipaa-complaint" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.075 }} target="security-card">
                    <p className="security-p-4">{"Field-level roles"}</p>
                  </TextFx>
                </div>
                <div className="security-box-28">
                  <div className="security-box-29">
                    <div className="security-box-30">
                      <Svg className="security-svg-3" id="svg12" />
                    </div>
                  </div>
                  <TextFx className="security-99-999-uptime" as="div" tokenization="line" transition={{ ...tween(0.4), delay: 0.075 }} target="security-card">
                    <p className="security-p-5">{"Append-only audit log"}</p>
                  </TextFx>
                </div>
              </div>
            </div>
          </div>
          <div className="security-box-31" />
        </div>
        <div className="security-box-32">
          <div className="security-box-33">
            <div className="security-box-34">
              <div className="security-box-35">
                <img className="security-img-6" src="/images/GFxRdsj55XSZItkh6zZOSnbEp8.png" alt="" draggable={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
