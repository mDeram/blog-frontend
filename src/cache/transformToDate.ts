export const transformToDate = (parent: any, _args: any, _cache: any, info: any) => {
    return new Date(parent[info.fieldName]);
}
