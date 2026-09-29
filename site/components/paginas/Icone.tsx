import type { Icon } from "@phosphor-icons/react";
import {
  BathtubIcon,
  BoneIcon,
  BowlFoodIcon,
  BugIcon,
  ClipboardTextIcon,
  CatIcon,
  DogIcon,
  DropIcon,
  EarIcon,
  EyeIcon,
  FirstAidIcon,
  FlaskIcon,
  HeartbeatIcon,
  MicroscopeIcon,
  MoonIcon,
  PawPrintIcon,
  PillIcon,
  ScalesIcon,
  ScanIcon,
  ScissorsIcon,
  ShieldCheckIcon,
  StethoscopeIcon,
  TestTubeIcon,
  ToothIcon,
  WarningCircleIcon,
  WalletIcon,
  WaveformIcon,
  WindIcon,
} from "@phosphor-icons/react/dist/ssr";

/**
 * O conteúdo (content/paginas.ts) guarda só o NOME do ícone, para a copy não
 * depender de import de componente. O mapa mora aqui, do lado do layout.
 */
const mapa: Record<string, Icon> = {
  bath: BathtubIcon,
  bone: BoneIcon,
  bowl: BowlFoodIcon,
  bug: BugIcon,
  cat: CatIcon,
  clipboard: ClipboardTextIcon,
  dog: DogIcon,
  drop: DropIcon,
  ear: EarIcon,
  eye: EyeIcon,
  firstAid: FirstAidIcon,
  flask: FlaskIcon,
  heartbeat: HeartbeatIcon,
  microscope: MicroscopeIcon,
  moon: MoonIcon,
  paw: PawPrintIcon,
  pill: PillIcon,
  scales: ScalesIcon,
  scan: ScanIcon,
  scissors: ScissorsIcon,
  shield: ShieldCheckIcon,
  stethoscope: StethoscopeIcon,
  testTube: TestTubeIcon,
  tooth: ToothIcon,
  warning: WarningCircleIcon,
  wallet: WalletIcon,
  waveform: WaveformIcon,
  wind: WindIcon,
};

export function Icone({ nome, tamanho = 22 }: { nome?: string; tamanho?: number }) {
  const Componente = (nome && mapa[nome]) || PawPrintIcon;
  return <Componente size={tamanho} weight="light" aria-hidden />;
}
