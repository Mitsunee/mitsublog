import { stylesheet } from "astroturf";

import theme from "@styles/theme";
import { parseToString } from "@utils/blog/parsePost";

import Meta from "@components/Meta";
import MainContent from "@components/MainContent";

// TEMP test astroturf-loader
const styles = stylesheet`
  .main {
    min-height: 150vh;
  }
`;

export default function Index({ themeDebug }) {
  return (
    <>
      <Meta
        description={
          "Freelance Frontend Dev | Weeb | Linux user | Music-Addict | rants too much"
        }
        image={"assets/avi_small.jpg"}
      />
      <main>
        <MainContent className={styles.main}>
          <h1>Hello, world!</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi
            tristique senectus et netus et malesuada fames ac. Pretium aenean
            pharetra magna ac placerat vestibulum lectus mauris ultrices. Non
            arcu risus quis varius quam quisque id. A cras semper auctor neque
            vitae tempus quam. A arcu cursus vitae congue mauris rhoncus aenean
            vel elit. Morbi tristique senectus et netus et malesuada fames ac.
            Netus et malesuada fames ac turpis egestas maecenas pharetra
            convallis. Erat imperdiet sed euismod nisi porta. Tortor aliquam
            nulla facilisi cras fermentum. Vitae proin sagittis nisl rhoncus
            mattis rhoncus urna.
          </p>
          <div dangerouslySetInnerHTML={{ __html: themeDebug }} />
        </MainContent>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const content = await parseToString(
    "```json\n" + JSON.stringify(theme, null, 2) + "\n```"
  );
  return {
    props: {
      themeDebug: content
    }
  };
}
