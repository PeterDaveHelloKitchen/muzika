import Gtk from "gi://Gtk?version=4.0";
import GObject from "gi://GObject";
import Adw from "gi://Adw";
import GLib from "gi://GLib";

import { load_thumbnails } from "../webimage.js";

import { ArtistRun, Thumbnail } from "../../muse.js";
import { omit } from "lodash-es";
import { pretty_subtitles } from "src/util/text.js";

interface ButtonProps extends Partial<Gtk.Button.ConstructorProperties> {
  on_clicked?: () => void;
  styles?: string[];
}

interface MenuButtonProps
  extends Partial<Gtk.MenuButton.ConstructorProperties> {}

export class PlaylistHeader extends Gtk.Box {
  static {
    GObject.registerClass({
      GTypeName: "PlaylistHeader",
      Template:
        "resource:///com/vixalien/muzika/ui/components/playlist/header.ui",
      Implements: [Gtk.Buildable],
      Properties: {
        "show-large-header": GObject.ParamSpec.boolean(
          "show-large-header",
          "Show Large Header",
          "Whether to show the larger header",
          GObject.ParamFlags.READWRITE,
          true,
        ),
        "show-avatar": GObject.ParamSpec.boolean(
          "show-avatar",
          "Show Avatar",
          "Whether to show the avatar or image",
          GObject.ParamFlags.READWRITE,
          false,
        ),
        "show-meta": GObject.ParamSpec.boolean(
          "show-meta",
          "Show Meta",
          "Whether to show the metadata like genre & year",
          GObject.ParamFlags.READWRITE,
          false,
        ),
      },
      InternalChildren: [
        "stack",
        "title",
        "subtitle",
        "submeta",
        "description_stack",
        "more",
        "buttons",
        "description",
        "description_long",
        "year",
        "genre",
        "subtitle_separator",
        "image",
        "explicit",
        "avatar",
      ],
    }, this);
  }

  private _stack!: Gtk.Stack;
  private _title!: Gtk.Label;
  private _subtitle!: Gtk.Label;
  private _submeta!: Gtk.Box;
  private _description_stack!: Gtk.Stack;
  private _more!: Gtk.Expander;
  private _buttons!: Gtk.Box;
  private _description!: Gtk.Label;
  private _description_long!: Gtk.Label;
  private _year!: Gtk.Label;
  private _genre!: Gtk.Label;
  private _subtitle_separator!: Gtk.Label;
  private _image!: Gtk.Image;
  private _explicit!: Gtk.Image;
  private _avatar!: Adw.Avatar;

  constructor() {
    super();

    const hover = new Gtk.EventControllerMotion();

    hover.connect("enter", () => {
      this._subtitle.add_css_class("hover");
    });

    hover.connect("leave", () => {
      this._subtitle.remove_css_class("hover");
    });

    this._subtitle.add_controller(hover);

    this._subtitle.connect("activate-link", (_, uri) => {
      if (uri && uri.startsWith("muzika:")) {
        this.activate_action(
          "navigator.visit",
          GLib.Variant.new_string(uri),
        );

        return true;
      }
    });
  }

  get show_large_header() {
    return this.orientation === Gtk.Orientation.HORIZONTAL;
  }

  set show_large_header(value: boolean) {
    if (this.show_large_header === value) return;

    this.orientation = value
      ? Gtk.Orientation.HORIZONTAL
      : Gtk.Orientation.VERTICAL;

    this._stack.halign =
      this._submeta.halign =
      this._more.halign =
      this._buttons.halign =
        value ? Gtk.Align.FILL : Gtk.Align.CENTER;

    this._title.justify =
      this._subtitle.justify =
      this._description.justify =
      this._description_long.justify =
        value
          ? this.get_direction() === Gtk.TextDirection.RTL
            ? Gtk.Justification.RIGHT
            : Gtk.Justification.LEFT
          : Gtk.Justification.CENTER;
  }

  private on_expander_activate() {
    this._description_stack.set_visible_child(
      this._more.expanded ? this._description : this._description_long,
    );
  }

  set_description(description: string | null) {
    if (description) {
      const split = description.split("\n");

      this._description.single_line_mode = true;

      this._description.set_visible(true);
      this._description.set_label(split[0].trim());

      this._description_long.set_visible(true);
      this._description_long.set_label(description);

      this._more.set_visible(
        this._description.get_layout().is_ellipsized() || split.length > 1,
      );
    } else {
      this._description_stack.set_visible(false);
      this._more.set_visible(false);
    }
  }

  set_year(year: string | null) {
    if (year) {
      this._year.set_label(year);
    } else {
      this._year.set_visible(false);
      this._subtitle_separator.set_visible(false);
    }
  }

  get show_avatar() {
    return this._stack.visible_child === this._avatar;
  }

  set show_avatar(avatar: boolean) {
    this._stack.visible_child = avatar ? this._avatar : this._image;
  }

  get show_meta() {
    return this._submeta.visible;
  }

  set show_meta(avatar: boolean) {
    this._submeta.visible = avatar;
  }

  load_thumbnails(thumbnails: Thumbnail[]) {
    load_thumbnails(
      this.show_avatar ? this._avatar : this._image,
      thumbnails,
      240,
    );
  }

  set_title(title: string) {
    this._title.set_label(title);
  }

  set_genre(genre: string) {
    this._genre.set_label(genre);
  }

  set_subtitle(
    subtitle: string | (null | string | ArtistRun)[],
    nodes: (string | null)[] = [],
  ) {
    const subtitle_authors = [];
    const subtitle_nodes = nodes.filter(Boolean) as string[];

    if (typeof subtitle === "string") {
      subtitle_authors.push(subtitle);
    } else {
      for (const node of subtitle) {
        if (!node) continue;

        subtitle_authors.push(node);
      }
    }

    const subtitles = pretty_subtitles(
      subtitle_authors,
      subtitle_nodes,
    );

    this._subtitle.label = subtitles.markup;
    this._subtitle.tooltip_text = subtitles.plain;
  }

  set_explicit(explicit: boolean) {
    this._explicit.set_visible(explicit);
  }

  vfunc_add_child(
    _builder: Gtk.Builder,
    child: GObject.Object,
    type?: string | null | undefined,
  ): void {
    if (type === "button" && child instanceof Gtk.Widget) {
      this._buttons.append(child);
    } else {
      super.vfunc_add_child(_builder, child, type);
    }
  }
}
