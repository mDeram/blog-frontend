export const transformToDate = (parent: any, args: any, cache: any, info: any) => {
    return new Date(parent[info.fieldName]);
}
