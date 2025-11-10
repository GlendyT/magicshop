import useBingo from "@/hooks/useBingo";
import { TARGET_SONGS_INFO } from "constants/constants";

import GridLayout from "./GridLayout";

const Resultado = () => {
  const { result, hasChecked } = useBingo();

  if (!hasChecked) {
    return <GridLayout songs={TARGET_SONGS_INFO} />;
  }

  if (hasChecked && result) {
    if (!result.userExists) {
      return (
        <GridLayout
          songs={TARGET_SONGS_INFO}
          userExists={false}
        />
      );
    }

    if (result.userExists && result.userInfo && result.allTargetSongs) {
      return (
        <GridLayout
          songs={result.allTargetSongs}
          userExists={true}
          userInfo={result.userInfo}
        />
      );
    }
  }

  return null;
};

export default Resultado;
