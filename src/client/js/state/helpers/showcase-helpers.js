export const mergeFetchedResourcesInTabs = function (tab, fetchedResources) {
    tab.resources.forEach((resource, index) => {
        resource = Object.assign(resource, fetchedResources[index]);
    });
};
