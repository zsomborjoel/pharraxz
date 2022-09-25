import { Generic } from '../services/model/Generic';

const getEntityNameById = <T extends Generic>(
    entities: T[],
    id: number | null | undefined
): string | null | undefined => entities?.find((entity) => entity.id === id)?.name;

const getEntityIdByName = <T extends Generic>(entities: T[], name: string | null): number | null | undefined =>
    entities?.find((entity) => entity.name === name)?.id;

const MapperUtil = {
    getEntityNameById,
    getEntityIdByName,
};

export default MapperUtil;
