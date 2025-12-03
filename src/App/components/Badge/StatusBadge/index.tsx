import { Text } from "App/components/Text";
import { Ellipse } from "assets/media/icons/Ellipse";

export interface StatusBadgeProps {
  status?: boolean;
}

export const StatusBadge = ({ status = false }: StatusBadgeProps) =>
  status ? (
    <>
      <Ellipse />
      <Text typography="Regular/12">Open</Text>
    </>
  ) : (
    <>
      <Ellipse color="var(--color-base-black)" />
      <Text typography="Regular/12">Closed</Text>
    </>
  );

export default StatusBadge;
