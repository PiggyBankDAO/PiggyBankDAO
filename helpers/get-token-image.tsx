import PBImg from "../assets/tokens/PB.svg";
import sPbImg from "../assets/tokens/SPB.png";

function toUrl(tokenPath: string): string {
    const host = window.location.origin;
    return `${host}/${tokenPath}`;
}

export function getTokenUrl(name: string) {
    if (name === "pb") {
        return toUrl(PBImg);
    }

    if (name === "spb") {
        return toUrl(sPbImg);
    }

    throw Error(`Token url doesn't support: ${name}`);
}
