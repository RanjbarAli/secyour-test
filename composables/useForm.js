import { validateEach, resolveRules } from "~/utils/validation";

export const useForm = (properties = {}) => {
  const propertiesRef = new Map();
  const watchers = new Set();

  const createProperty = (key, property) => {
    const name = property.name ?? useTrans(`attributes.${key}`) ?? key;
    const data = (property?.each? ref(property.default) : shallowRef(property.default))

    propertiesRef.set(key, {
      data,
      name,
      rules: resolveRules(property.rules, name),
    });

    const prop = reactive({
      name,
      data,
      default: property.default,
      error: "",
      hasError: false,
      isDirty: false,
      isValid: false,
      set(newData, validate = false, setDirty = true) {
        if (typeof newData !== "undefined") data.value = newData;
        if (validate) this.validate(newData, setDirty);
      },
      validate(newData, setDirty = true) {
        const otherProps = Object.fromEntries(
          Array.from(propertiesRef.entries())
            .filter(([k]) => k !== key)
            .map(([k, { data, name }]) => [k, { data, name }])
        );

        const validator = validateEach(
          property?.each,
          newData ?? data.value,
          name,
          propertiesRef.get(key).rules,
          otherProps
        );

        this.error = typeof validator === 'string'? validator : "";
        this.isDirty = setDirty;
        this.isValid = validator === 2;
        this.hasError = typeof validator === "string";
      },
      fails() {
        this.validate()
        return !this.isValid
      },
      reset() {
        this.error = "";
        this.isDirty = false;
        this.isValid = false;
        this.hasError = false;
        data.value = property.default;
      },
      setError(message) {
        this.error = message;
        this.isDirty = true;
        this.isValid = false;
        this.hasError = true;
      },
    });

    const watcherDeps = [
      data,
      ...Object.entries(propertiesRef.get(key).rules)
        .filter(([name]) => name.startsWith("_"))
        .map(([, params]) => propertiesRef.get(params[0]).data),
    ];

    if (property?.immediate || "terms" in propertiesRef.get(key).rules)
      prop.set(undefined, true, false);

    const stopWatch = watch(
      watcherDeps,
      () => ('watch' in property)? prop.set(undefined, true) :  prop.error = "",
      { deep: true }
    );

    watchers.add(stopWatch);

    return prop;
  };

  const props = Object.entries(properties).map(([key, property]) => [
    key,
    createProperty(key, property),
  ]);

  const isValid = computed(() => props.every(([, value]) => value.isValid));
  const errors = computed(() =>
    props.flatMap(([, value]) => value?.error || [])
  );
  const isDirty = computed(() => props.some(([, value]) => value.isDirty));

  const cleanup = () => {
    watchers.forEach((stop) => stop());
    watchers.clear();
  };

  return reactive({
    ...Object.fromEntries(props),
    isValid,
    errors,
    isDirty,
    validate: () => props.forEach(([, value]) => value.validate()),
    reinitialize(properties) {
      Object.assign(this, useForm(properties))
    },
    fails() {
      this.validate()
      return !this.isValid
    },
    async submit(callback, errorCount = 1) {
      if (this.fails()) {
        this.errors.slice(0, errorCount).forEach((error) => {
          if (typeof error === "string") {
            useAlerts().add(error, 'error');
          }
        })
        return;
      }
      await callback(this.all());
      return false;
    },
    all: () =>
      Object.fromEntries(
        Array.from(propertiesRef.entries()).map(([key, { data }]) => [
          key,
          data.value,
        ])
      ),
    cleanup,
  });
};

export const useForms = (propertiesList = []) => {
  const forms = reactive(
    propertiesList.map((properties) => useForm(properties))
  );

  const isValid = computed(() => forms.every((form) => form.isValid));
  const errors = computed(() => forms.flatMap((form) => form.errors || []));
  const isDirty = computed(() => forms.some((form) => form.isDirty));
  const fails = () => forms.some((form) => form.fails());

  const add = (newVal = {}) => forms.push(useForm(newVal));
  const all = () => forms.map((form) => form.all());

  const remove = (index) => {
    if (index >= 0 && index < forms.length) {
      forms[index].cleanup();
      forms.splice(index, 1);
    }
  };

  return reactive({ forms, isValid, errors, isDirty, fails, all, add, remove });
};
