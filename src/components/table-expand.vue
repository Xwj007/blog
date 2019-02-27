<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col span="12">
                <span class="expand-key">发布人: </span>
                <span class="expand-value">{{ row.posted_name }}</span>
            </Col>
            <Col span="12">
                <span class="expand-key">发布时间: </span>
                <span class="expand-value">{{ row.posted_time }}</span>
            </Col>

        </Row>
        <Row>
            <Col span="24">
                <span class="expand-key">文章: </span>
                <span class="expand-value">{{ row.topic_content }}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>