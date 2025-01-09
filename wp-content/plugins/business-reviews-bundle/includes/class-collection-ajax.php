<?php

namespace WP_Business_Reviews_Bundle\Includes;

use WP_Business_Reviews_Bundle\Includes\Core\Core;

class Collection_Ajax {

    public function __construct(Collection_Deserializer $collection_deserializer, Core $core) {
        $this->collection_deserializer = $collection_deserializer;
        $this->core = $core;

        $brb_ajax_off = get_option('brb_ajax_off');
        if ($brb_ajax_off != 'true') {
            add_action('wp_ajax_brb_get_reviews', array($this, 'get_reviews'));
            add_action('wp_ajax_nopriv_brb_get_reviews', array($this, 'get_reviews'));
        }
    }

    public function get_reviews() {
        $id = $_GET['id'];
        if (isset($id)) {
            $collection = $this->collection_deserializer->get_collection($id);
            $data = $this->core->get_reviews($collection);

            $offset = $_GET['offset'] ? $_GET['offset'] : 0;
            $size = $_GET['size'] ? $_GET['size'] : 10;
            $reviews = array_slice($data['reviews'], $offset, $size);

            wp_send_json(array('reviews' => $reviews));
        }
    }

}
