export const parseLinkToFetchUsers = (type: string, id?: string) => {
  let url = ``;
  switch (type) {
    case 'travel-agency':
      url = `admin/travel-agency`;
      break;
    case 'dispatcher':
      url = `admin/dispatcher`;
      break;
    case 'agent':
      url = `admin/${id}/travel-agency-agent`;
      break;
    default:
      break;
  }
  return url;
};
