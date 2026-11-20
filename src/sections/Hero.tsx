import { RollingText } from "../components/RollingText";
import { Svg } from "../components/Svg";
import { Embed } from "../components/Embed";
import { Press } from "../components/Press";
import { PhoneNavRoot, MenuIcon, MenuLine } from "../components/PhoneNav";
import { Reveal, tween, centerX } from "../components/Reveal";
import "./Hero.css";

export function Hero() {
  return (
    <div className="hero-hero-30">
      <div className="hero-hero-section">
        <Reveal className="hero-box" as="div" from={{ opacity: 0.001 }} to={{ opacity: 1 }} transition={tween(0.5)} playOnMount>
          <div className="hero-box-2">
            <div className="hero-box-3">
              <img className="hero-img" src="/images/colophon-mark-white.svg" alt="" draggable={false} />
            </div>
          </div>
          <div className="hero-slot">
            <Embed className="hero-iframe" src="/embeds/signal-band.html" />
          </div>
        </Reveal>
        <Reveal className="hero-box-4" as="div" from={{ opacity: 0.001 }} to={{ opacity: 1 }} transition={tween(0.5, 1.5)} playOnMount>
          <div className="hero-box-5">
            <div className="hero-box-6" />
            <div className="hero-box-7">
              <div className="hero-pack-of-digital-media">
                <p className="hero-p">{"Open-source CMS"}</p>
              </div>
            </div>
          </div>
          <div className="hero-box-8">
            <p className="hero-p-2">{"Know exactly what went live."}</p>
          </div>
          <div className="hero-box-9">
            <div className="hero-box-10">
              <div className="hero-box-11">
                <p className="hero-p-3">{"Colophon is an open-source CMS. Write, review and ship your site’s articles, then see what went live, when, and where readers saw it."}</p>
              </div>
            </div>
            <div className="hero-box-12">
              <div className="hero-box-13">
                <div className="hero-explore-receipts">
                  <h2 className="hero-h2">{"Get started"}</h2>
                </div>
                <div className="hero-famicons-arrow-up-sharp">
                  <div className="hero-box-14">
                    <Svg className="hero-svg" id="svg1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal className="hero-pack-of-digital-media-2" as="div" from={{ opacity: 0.001, y: 60 }} to={{ opacity: 1, y: 0 }} transition={tween(0.5, 1.5)} playOnMount>
          <div className="hero-box-15">
            <div className="hero-box-16">
              <div className="hero-box-17" />
              <div className="hero-box-18">
                <div className="hero-pack-of-digital-media-3">
                  <p className="hero-p-4">
                    <span className="hero-span">{"Open-source CMS"}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="hero-box-19">
              <p className="hero-p-5">{"Know exactly what went live."}</p>
            </div>
          </div>
          <div className="hero-box-20">
            <div className="hero-box-21">
              <div className="hero-box-22">
                <p className="hero-p-6">
                  <span className="hero-span-2">{"Colophon is an open-source CMS. Write, review and ship your site’s articles, then see what went live, when, and where readers saw it."}</span>
                </p>
              </div>
            </div>
            <div className="hero-slot-2">
              <a className="hero-link" data-name="Default">
                <Press className="hero-slot-3" as="div" data-name="Label">
                  <RollingText className="hero-box-23" text="Get started" color="rgb(255, 255, 255)" fontFamily={"Inter, \"Inter Placeholder\", sans-serif"} fontWeight={400} />
                </Press>
                <div className="hero-box-24">
                  <div className="hero-box-25">
                    <div className="hero-box-26">
                      <img className="hero-img-2" src="/images/XxkKDiuJDVV0jKAS4a8ieVIfhak.svg" alt="" draggable={false} />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
      <Reveal className="hero-slot-4" as="div" from={{ opacity: 0.001, y: -70 }} to={{ opacity: 1, y: 0 }} transition={tween(0.4, 2)} playOnMount transformTemplate={centerX}>
        <div className="hero-box-27" data-name="Desktop / Tab" data-border="true">
          <div className="hero-logo-wrapper">
            <a className="hero-logo">
              <div className="hero-box-28">
                <img className="hero-img-3" src="/images/colophon-logo-nav.svg" alt="Colophon" draggable={false} />
              </div>
            </a>
          </div>
          <div className="hero-slot-5">
            <div className="hero-box-29" data-name="Desktop / Tab">
              <div className="hero-nav-link-01" data-name="Nav Link 01">
                <a className="hero-link-2" data-name="Desktop">
                  <Press className="hero-slot-6" as="div" data-name="Label">
                    <RollingText className="hero-box-30" text="Features" color="rgb(0, 0, 0)" fontFamily={"\"Aspekta Variable Variable\", \"Aspekta Variable Variable Placeholder\", sans-serif"} fontWeight={400} />
                  </Press>
                </a>
              </div>
              <div className="hero-nav-link-02" data-name="Nav Link 02">
                <a className="hero-link-2" data-name="Desktop">
                  <Press className="hero-slot-6" as="div" data-name="Label">
                    <RollingText className="hero-box-31" text="Docs" color="rgb(0, 0, 0)" fontFamily={"\"Aspekta Variable Variable\", \"Aspekta Variable Variable Placeholder\", sans-serif"} fontWeight={400} />
                  </Press>
                </a>
              </div>
              <div className="hero-nav-link-03" data-name="Nav Link 03">
                <a className="hero-link-2" data-name="Desktop">
                  <Press className="hero-slot-6" as="div" data-name="Label">
                    <RollingText className="hero-box-32" text="Blog" color="rgb(0, 0, 0)" fontFamily={"\"Aspekta Variable Variable\", \"Aspekta Variable Variable Placeholder\", sans-serif"} fontWeight={400} />
                  </Press>
                </a>
              </div>
              <div className="hero-nav-link-04" data-name="Nav Link 04">
                <a className="hero-link-2" data-name="Desktop">
                  <Press className="hero-slot-6" as="div" data-name="Label">
                    <RollingText className="hero-box-33" text="Build log" color="rgb(0, 0, 0)" fontFamily={"\"Aspekta Variable Variable\", \"Aspekta Variable Variable Placeholder\", sans-serif"} fontWeight={400} />
                  </Press>
                </a>
              </div>
            </div>
          </div>
          <div className="hero-slot-7">
            <a className="hero-link-3" data-name="Default">
              <Press className="hero-slot-8" as="div" data-name="Label">
                <RollingText className="hero-box-34" text="Get started" color="rgb(255, 255, 255)" fontFamily={"Inter, \"Inter Placeholder\", sans-serif"} fontWeight={400} />
              </Press>
              <div className="hero-box-35">
                <div className="hero-box-36">
                  <div className="hero-box-37">
                    <img className="hero-img-4" src="/images/XxkKDiuJDVV0jKAS4a8ieVIfhak.svg" alt="" draggable={false} />
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
        <PhoneNavRoot className="hero-box-38" data-name="Desktop / Tab" data-border="true">
          <div className="hero-logo-wrapper-2">
            <a className="hero-logo-2">
              <div className="hero-box-39">
                <img className="hero-img-5" src="/images/colophon-logo-nav.svg" alt="Colophon" draggable={false} />
              </div>
            </a>
            <div className="hero-slot-9">
              <MenuIcon className="hero-menu" data-name="Menu">
                <MenuLine className="hero-box-40" closed={0} opened={135} data-name="Line 02" />
                <MenuLine className="hero-box-41" closed={90} opened={225} data-name="Line 01" />
              </MenuIcon>
            </div>
          </div>
          <div className="hero-slot-10">
            <div className="hero-box-42" data-name="Desktop / Tab">
              <div className="hero-nav-link-01-2" data-name="Nav Link 01">
                <a className="hero-link-4" data-name="Desktop">
                  <Press className="hero-slot-11" as="div" data-name="Label">
                    <RollingText className="hero-box-43" text="Features" color="rgb(0, 0, 0)" fontFamily={"\"Aspekta Variable Variable\", \"Aspekta Variable Variable Placeholder\", sans-serif"} fontWeight={400} />
                  </Press>
                </a>
              </div>
              <div className="hero-nav-link-02-2" data-name="Nav Link 02">
                <a className="hero-link-4" data-name="Desktop">
                  <Press className="hero-slot-11" as="div" data-name="Label">
                    <RollingText className="hero-box-44" text="Docs" color="rgb(0, 0, 0)" fontFamily={"\"Aspekta Variable Variable\", \"Aspekta Variable Variable Placeholder\", sans-serif"} fontWeight={400} />
                  </Press>
                </a>
              </div>
              <div className="hero-nav-link-03-2" data-name="Nav Link 03">
                <a className="hero-link-4" data-name="Desktop">
                  <Press className="hero-slot-11" as="div" data-name="Label">
                    <RollingText className="hero-box-45" text="Blog" color="rgb(0, 0, 0)" fontFamily={"\"Aspekta Variable Variable\", \"Aspekta Variable Variable Placeholder\", sans-serif"} fontWeight={400} />
                  </Press>
                </a>
              </div>
              <div className="hero-nav-link-04-2" data-name="Nav Link 04">
                <a className="hero-link-4" data-name="Desktop">
                  <Press className="hero-slot-11" as="div" data-name="Label">
                    <RollingText className="hero-box-46" text="Build log" color="rgb(0, 0, 0)" fontFamily={"\"Aspekta Variable Variable\", \"Aspekta Variable Variable Placeholder\", sans-serif"} fontWeight={400} />
                  </Press>
                </a>
              </div>
            </div>
          </div>
          <div className="hero-slot-12">
            <a className="hero-link-5" data-name="Default">
              <Press className="hero-slot-13" as="div" data-name="Label">
                <RollingText className="hero-box-47" text="Get started" color="rgb(255, 255, 255)" fontFamily={"Inter, \"Inter Placeholder\", sans-serif"} fontWeight={400} />
              </Press>
              <div className="hero-box-48">
                <div className="hero-box-49">
                  <div className="hero-box-50">
                    <img className="hero-img-6" src="/images/XxkKDiuJDVV0jKAS4a8ieVIfhak.svg" alt="" draggable={false} />
                  </div>
                </div>
              </div>
            </a>
          </div>
        </PhoneNavRoot>
      </Reveal>
    </div>
  );
}
