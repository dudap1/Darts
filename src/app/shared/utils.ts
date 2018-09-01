declare const $;

export class Utils {

  public static showError(error) {
    let err: string[] = [];
    error.error.errors.forEach(e => {
      err.push(e.field + " " + e.defaultMessage)
    });
    Utils.showNotification(err.join("<br>"), 'danger');
  }

  public static showNotification(text, type) {
    $.notify({
      icon: "add_alert",
      message: text

    }, {
      type: type,
      timer: 4000,
      placement: {
        from: "top",
        align: "right"
      }
    });
  }

}
