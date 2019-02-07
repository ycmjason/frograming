<script>
import { MAX_X, MAX_Y } from '../../models/Board.js';

export default {
  functional: true,
  render: (h, { props }) => {
    const { color, width } = props;
    const halfWidth = width / 2;

    return h('g',
      {
        attrs: { stroke: color, 'stroke-width': width },
      },
      [
        [[-halfWidth, -halfWidth], [-halfWidth, MAX_Y + halfWidth + 1]],
        [[-halfWidth, -halfWidth], [MAX_X + halfWidth + 1, -halfWidth]],
        [[-halfWidth, MAX_Y + halfWidth + 1], [MAX_X + halfWidth + 1, MAX_Y + halfWidth + 1]],
        [[MAX_X + halfWidth + 1, -halfWidth], [MAX_X + halfWidth + 1, MAX_Y + halfWidth + 1]],
      ].map(([[x1, y1], [x2, y2]]) => h('line', { attrs: { x1, y1, x2, y2 } })),
    );
  },
};
</script>
